import { CreateOdPairDto } from './dto/create-od-pair.dto';
import { UpdateOdPairDto } from './dto/update-od-pair.dto';
export declare class OdPairsService {
    create(createOdPairDto: CreateOdPairDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateOdPairDto: UpdateOdPairDto): string;
    remove(id: number): string;
}
