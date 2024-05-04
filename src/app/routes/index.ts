import express from 'express'
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route'
const router = express.Router()

const moduleRoutes = [
  { path: '/academic-department', route: AcademicDepartmentRoutes },
]

moduleRoutes.forEach(({ path, route }) => router.use(path, route))

export default router
