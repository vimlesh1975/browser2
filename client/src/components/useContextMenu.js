import { useEffect, useState, useCallback } from "react";

const useContextMenu = () => {
  const [xPos, setXPos] = useState("0px");
  const [yPos, setYPos] = useState("0px");
  const [showMenu, setShowMenu] = useState(false);

  const handleContextMenu = useCallback(
    (e) => {
      console.log(e.clientX);
      if (( e.clientX < 300) ||(1380 < e.clientX )) return
      if (e.clientY < 200) return
      e.preventDefault();
      setXPos(`${e.clientX-40}px`);
      setYPos(`${e.clientY}px`);
      setShowMenu(true)
    },
    [setXPos, setYPos]
  );

  const handleClick = useCallback(() => {
    showMenu && setShowMenu(false);
  }, [showMenu]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  });

  return { xPos, yPos, showMenu };
};

export default useContextMenu