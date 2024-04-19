import { useContext } from "react";
import { AppContext, ContextType } from "./AppContext";
import { SearchContext, SearchContextType } from "./SearchContext";

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as ContextType;
};

export const useSearchContext = () => {
  const searchContext = useContext(SearchContext);
  return searchContext as SearchContextType;
};
