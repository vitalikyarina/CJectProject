import { Observable } from "rxjs";

export interface IBaseApiService<Entity, CreateEntity, UpdateEntity> {
  getAll(): Observable<Entity[]>;
  getById(id: string): Observable<Entity>;

  createOne(createEntity: CreateEntity): Observable<Entity>;
  updateOneById(id: string, updateEntity: UpdateEntity): Observable<Entity>;
}
