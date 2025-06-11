enum EitherType {
  Left = "left",
  Right = "right",
}

type EitherLeft<T> = {
  type: EitherType.Left;
  value: T;
} & { readonly __brand: unique symbol };

type EitherRight<T> = {
  type: EitherType.Right;
  value: T;
} & { readonly __brand: unique symbol };

type Either<L, R> = EitherLeft<L> | EitherRight<R>;

function eitherLeft<T>(value: T): EitherLeft<T> {
  return {
    type: EitherType.Left,
    value,
  } as EitherLeft<T>;
}

function eitherRight<T>(value: T): EitherRight<T> {
  return {
    type: EitherType.Right,
    value,
  } as EitherRight<T>;
}

export { Either, EitherType, eitherLeft, eitherRight };
