import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Password should not be empty' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'At least 8 characters' })
  @Matches(/\d/, { message: 'At least 1 number' })
  @Matches(/[a-z]/, {
    message: 'At least 1 lowercase letter',
  })
  @Matches(/[A-Z]/, {
    message: 'At least 1 uppercase letter',
  })
  @Matches(/[\W_]/, {
    message: 'At least 1 special character',
  })
  password: string;

  @IsNotEmpty({ message: 'Name should not be empty' })
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name: string;

  @IsNotEmpty({ message: 'Role should not be empty' })
  @Matches(/^(user|admin|moderator)$/, {
    message: 'Role must be either user, admin or moderator',
  })
  role: string;
}
