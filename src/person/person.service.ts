import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PersonService {
  create(createPersonDto: CreatePersonDto) {
    return {
      message: 'Dados enviados com sucesso',
      data: createPersonDto,
    };
  }

  findAll() {
    return `This action returns all person`;
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return {
      message: `This action updates a #${id} person`,
      data: updatePersonDto,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
