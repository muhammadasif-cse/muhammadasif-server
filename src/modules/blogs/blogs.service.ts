import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { APIResponse } from 'src/common/interfaces/api-response.interface';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create.blog.dto';
import { CreateCommentDto, ReplyCommentDto } from './dto/create.comment.dto';
import { CreateLikeDto } from './dto/create.like.dto';
import { CreateRatingDto } from './dto/create.rating.dto';
import { UpdateBlogDto } from './dto/update.blog.dto';
import { UpdateCommentDto } from './dto/update.comment.dto';
import { UpdateRatingDto } from './dto/update.rating.dto';
import { Blog } from './entity/blog.entity';
import { Comment } from './entity/comment.entity';
import { Like } from './entity/like.entity';
import { Rating } from './entity/rating.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
    @InjectRepository(Rating)
    private ratingsRepository: Repository<Rating>,
  ) {}

  // Create a new blog
  async create(createBlogDto: CreateBlogDto): Promise<APIResponse<Blog>> {
    const blog = this.blogsRepository.create(createBlogDto);
    const blogCreated = await this.blogsRepository.save(blog);
    return {
      status: HttpStatus.CREATED,
      message: 'Blog created successfully',
      data: blogCreated,
    };
  }

  // Get all blogs with pagination
  async findAll(paginationDto: PaginationDto): Promise<APIResponse<Blog>> {
    const { page, limit, sortBy, sortOrder } = paginationDto;
    const validSortBy = ['id', 'createdAt'];
    const orderBy = validSortBy.includes(sortBy) ? sortBy : 'createdAt';

    const [blogs, totalItems] = await this.blogsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { [orderBy]: sortOrder },
    });

    const totalPages = Math.ceil(totalItems / limit);

    return {
      status: HttpStatus.OK,
      message: 'Blogs retrieved successfully',
      data: blogs,
      meta: {
        totalItems,
        currentPage: page,
        totalPages,
        itemsPerPage: limit,
        sortBy: orderBy,
        sortOrder,
      },
    };
  }

  async findOne(id: string): Promise<APIResponse<Blog>> {
    const blog = await this.blogsRepository.findOne({
      where: { id },
      relations: ['comments', 'likes', 'ratings'],
    });

    if (!blog) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Blog not found',
      };
    }

    const comments = await this.commentsRepository.find({
      where: { blogId: id },
      relations: ['replies'],
    });

    const organizeComments = (
      comments: Comment[],
      parentCommentId: string | null = null,
    ): Comment[] => {
      return comments
        .filter((comment) => comment.parentCommentId === parentCommentId)
        .map((comment) => {
          comment.replies = organizeComments(comments, comment.id);
          return comment;
        });
    };

    const nestedComments = organizeComments(comments);
    blog.comments = nestedComments;

    return {
      status: HttpStatus.OK,
      message: 'Blog retrieved successfully',
      data: blog,
    };
  }

  // Update a blog
  async update(
    id: string,
    updateBlogDto: UpdateBlogDto,
  ): Promise<APIResponse<Blog>> {
    await this.blogsRepository.update(id, updateBlogDto);
    const updatedBlog = await this.blogsRepository.findOne({ where: { id } });

    if (!updatedBlog) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Blog not found',
      };
    }

    return {
      status: HttpStatus.OK,
      message: 'Blog updated successfully',
      data: updatedBlog,
    };
  }

  // Delete a blog
  async remove(id: string): Promise<APIResponse<Blog>> {
    const blogDeleted = await this.blogsRepository.delete(id);
    if (blogDeleted.affected === 0) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Blog not found',
      };
    }
    return {
      status: HttpStatus.OK,
      message: 'Blog deleted successfully',
    };
  }

  // Add a comment to a blog
  async addComment(
    blogId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<APIResponse<Comment>> {
    // Ensure that the blog exists (optional, based on your use case)
    const blog = await this.blogsRepository.findOne({ where: { id: blogId } });
    if (!blog) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Blog not found',
      };
    }

    // Associate the comment with the blog ID
    createCommentDto.blogId = blogId;
    const comment = this.commentsRepository.create(createCommentDto);
    const savedComment = await this.commentsRepository.save(comment);
    return {
      status: HttpStatus.CREATED,
      message: 'Comment added successfully',
      data: savedComment,
    };
  }

  // Reply to a comment
  async replyToComment(
    blogId: string,
    parentCommentId: string,
    replyCommentDto: ReplyCommentDto,
  ): Promise<APIResponse<Comment>> {
    // Ensure that the parent comment exists
    const parentComment = await this.commentsRepository.findOne({
      where: { id: parentCommentId, blogId: blogId },
    });
    if (!parentComment) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Parent comment not found',
      };
    }

    // Associate the reply with the parent comment ID and blog ID
    replyCommentDto.blogId = blogId;
    replyCommentDto.parentCommentId = parentCommentId; // Ensure this is set correctly
    const reply = this.commentsRepository.create(replyCommentDto);
    const savedReply = await this.commentsRepository.save(reply);
    return {
      status: HttpStatus.CREATED,
      message: 'Reply added successfully',
      data: savedReply,
    };
  }

  // Update a comment (or reply)
  async updateComment(
    blogId: string,
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<APIResponse<Comment>> {
    const comment = await this.commentsRepository.findOne({
      where: { id: id, blogId: blogId },
    });
    if (!comment) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Comment not found',
      };
    }
    await this.commentsRepository.update(id, updateCommentDto);
    const updatedComment = await this.commentsRepository.findOne({
      where: { id: id },
      relations: ['replies'],
    });

    // Ensure the updated comment does not include itself in the replies array
    if (updatedComment.replies) {
      updatedComment.replies = updatedComment.replies.filter(
        (reply) => reply.id !== updatedComment.id,
      );
    }

    return {
      status: HttpStatus.OK,
      message: 'Comment updated successfully',
      data: updatedComment,
    };
  }

  // Get comments for a blog with nested replies
  async getComments(blogId: string): Promise<APIResponse<Comment[]>> {
    const comments = await this.commentsRepository.find({
      where: { blogId },
      relations: ['replies'],
    });

    const organizeComments = (
      comments: Comment[],
      parentCommentId: string | null = null,
    ): Comment[] => {
      return comments
        .filter((comment) => comment.parentCommentId === parentCommentId)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .map((comment) => {
          comment.replies = organizeComments(comments, comment.id);
          return comment;
        });
    };

    const nestedComments = organizeComments(comments);

    return {
      status: HttpStatus.OK,
      message: 'Comments retrieved successfully',
      data: nestedComments,
    };
  }

  // Delete a comment
  async deleteComment(
    blogId: string,
    id: string,
  ): Promise<APIResponse<Comment>> {
    const comment = await this.commentsRepository.findOne({
      where: { blogId, id },
    });
    if (!comment) {
      throw new Error('Comment not found');
    }
    await this.commentsRepository.remove(comment);
    return {
      status: HttpStatus.OK,
      message: 'Comment deleted successfully',
      data: comment,
    };
  }

  // Add a like to a blog
  async addLike(
    blogId: string,
    createLikeDto: CreateLikeDto,
  ): Promise<APIResponse<Like>> {
    // Optionally check if the blog exists
    const blog = await this.blogsRepository.findOne({ where: { id: blogId } });
    if (!blog) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Blog not found',
      };
    }

    const existingLike = await this.likesRepository.findOne({
      where: { blogId },
    });

    if (existingLike) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'You have already liked this blog',
      };
    }

    createLikeDto.blogId = blogId;
    const like = this.likesRepository.create(createLikeDto);
    const savedLike = await this.likesRepository.save(like);
    return {
      status: HttpStatus.CREATED,
      message: 'Like added successfully',
      data: savedLike,
    };
  }

  // Get all likes for a blog
  async getLikes(blogId: string): Promise<APIResponse<Like[]>> {
    const likes = await this.likesRepository.find({
      where: { blogId },
    });

    return {
      status: HttpStatus.OK,
      message: 'Likes retrieved successfully',
      data: likes,
    };
  }

  // Remove a like (to unlike)
  async removeLike(blogId: string, id: string): Promise<APIResponse<Like>> {
    const like = await this.likesRepository.findOne({
      where: { id: id, blogId: blogId },
    });
    if (!like) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Like not found',
      };
    }
    await this.likesRepository.delete(id);
    return {
      status: HttpStatus.OK,
      message: 'Like removed successfully',
    };
  }

  // Add a rating to a blog
  async addRating(
    blogId: string,
    createRatingDto: CreateRatingDto,
  ): Promise<APIResponse<Rating>> {
    // Optionally check if the blog exists
    const blog = await this.blogsRepository.findOne({ where: { id: blogId } });
    if (!blog) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Blog not found',
      };
    }

    createRatingDto.blogId = blogId;
    const rating = this.ratingsRepository.create(createRatingDto);
    const savedRating = await this.ratingsRepository.save(rating);
    return {
      status: HttpStatus.CREATED,
      message: 'Rating added successfully',
      data: savedRating,
    };
  }
  // Get all ratings for a blog
  async getRatings(blogId: string): Promise<APIResponse<Rating[]>> {
    const ratings = await this.ratingsRepository.find({
      where: { blogId },
    });

    return {
      status: HttpStatus.OK,
      message: 'Ratings retrieved successfully',
      data: ratings,
    };
  }
  // Update a rating
  async updateRating(
    id: string,
    blogId: string,
    updateRatingDto: UpdateRatingDto,
  ): Promise<APIResponse<Rating>> {
    const rating = await this.ratingsRepository.findOne({
      where: { id: id, blogId: blogId },
    });
    if (!rating) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Rating not found',
      };
    }
    await this.ratingsRepository.update(id, updateRatingDto);
    const updatedRating = await this.ratingsRepository.findOne({
      where: { id: id },
    });
    return {
      status: HttpStatus.OK,
      message: 'Rating updated successfully',
      data: updatedRating,
    };
  }
}
