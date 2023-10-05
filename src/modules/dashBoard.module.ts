import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Record_entry } from "src/entitys/record_entry_and_out.entity";
import { RecordEntryModule } from "./record_entry_and_out.module";
import { DashBoardService } from "src/services/dashBoard.service";
import { DashBoardController } from "src/controllers/dashboard.controller";

@Module({
    imports:[TypeOrmModule.forFeature([Record_entry]),RecordEntryModule],
    controllers:[DashBoardController],
    providers:[DashBoardService], 
})
export class DashBoardModule{}