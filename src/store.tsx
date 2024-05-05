import { ParentComponent, createContext } from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";

type TState = {
  user: { username: string; email: string } | null;
  loggedIn: boolean;
};
type TSetter = SetStoreFunction<TState>;
export const StoreContext = createContext([
  { user: null, loggedIn: false } as TState,
  (() => {}) as any as TSetter,
] as const);

export const StoreProvider: ParentComponent = (props) => {
  const [state, setState] = createStore<TState>({
    user: null,
    loggedIn: false,
  });
  return (
    <StoreContext.Provider value={[state, setState]}>
      {props.children}
    </StoreContext.Provider>
  );
};
