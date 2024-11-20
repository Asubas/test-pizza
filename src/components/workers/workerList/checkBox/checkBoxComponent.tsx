import { memo, useEffect, useState } from "react";

const CheckBoxComponent = memo(
  ({
    id,
    onChange,
    isArchive,
  }: {
    id: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isArchive: boolean;
  }) => {
    const [archived, setArchived] = useState(isArchive);
    useEffect(() => {
      setArchived(isArchive);
    }, [isArchive]);
    return (
      <input id={id} type="checkbox" onChange={onChange} checked={archived} />
    );
  }
);

export { CheckBoxComponent };
