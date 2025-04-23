import { PartialType } from '@nestjs/swagger';
import { CreateListasMaterialeDto } from './create-listas-materiale.dto';

export class UpdateListasMaterialeDto extends PartialType(CreateListasMaterialeDto) {}
