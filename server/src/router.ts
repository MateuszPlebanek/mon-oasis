import { Router } from 'express'
import plantactions from './modules/plants/plantActions'

const router = Router()

router.get('/plants', plantactions.browse)
router.get('/plants/:id', plantactions.read)

export default router;
