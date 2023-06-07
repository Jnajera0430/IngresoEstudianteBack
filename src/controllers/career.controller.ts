import { Controller } from '@nestjs/common';
import {CareerService} from '../services/career.service'

@Controller('career')
export class CareerController {
    constructor(private readonly careerService: CareerService){}
}
