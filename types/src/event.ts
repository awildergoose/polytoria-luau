// generic magic
raw_prefix(`export type Event<T... = ...any> = {
    Connect: (self: Event<T...>, callback: (T...) -> ()) -> (),
    Disconnect: (self: Event<T...>, callback: (T...) -> ()) -> (),
}`);
