import { useEffect, useState } from 'react';

interface CssClass {
  base: string;
  [key: string]: string;
}

export function useCssClassManager(cssClassMap: CssClass) {
  const [classMap, setClassMap] = useState<CssClass>({
    base: cssClassMap.base,
  });

  const [classList, setClassList] = useState('');
  const removeClassName = (classKey: string) => {
    setClassMap((prev) => {
      const template = { ...prev };
      delete template[classKey];
      return template;
    });
  };
  const addClassName = (classKey: string) => {
    setClassMap((prev) => ({ ...prev, [classKey]: cssClassMap[classKey] }));
  };
  useEffect(() => {
    setClassList(Object.values(classMap).join(' '));
  }, [classMap]);
  return {
    removeClassName,
    addClassName,
    classList,
  };
}
