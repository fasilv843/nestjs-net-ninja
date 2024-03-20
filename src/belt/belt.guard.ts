import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BeltGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // const request = context.switchToHttp().getRequest()

    const hasBlackBelt = true;

    // this guard only allows to enter the controller if user have black belt
    return hasBlackBelt;
  }
}
