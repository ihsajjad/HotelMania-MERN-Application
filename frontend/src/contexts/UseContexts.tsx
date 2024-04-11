import { useContext } from "react";
import { AppContext, ContextType } from "./AppContext";
import { HotelsContext, HotelsContextType } from "./HotelsProvider";
import { SearchContext, SearchContextType } from "./SearchContext";

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as ContextType;
};

export const useSearchContext = () => {
  const searchContext = useContext(SearchContext);
  return searchContext as SearchContextType;
};

export const useHotelsContext = () => {
  const hotelsContext = useContext(HotelsContext);
  return hotelsContext as HotelsContextType;
};
