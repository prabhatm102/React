import { useEffect } from "react";

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title;
    return () => {
      console.log("cleanup");
    };
  });
};

export default useDocumentTitle;
