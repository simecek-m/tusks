import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useTheme } from "provider/ThemeProvider";
import { FC } from "react";
import { ITag, ThemedColor } from "type";

interface TagProps {
  id: string;
  label: string;
  color: ThemedColor;
  owner: string;
  onDelete: (tag: ITag) => void;
}

export const Tag: FC<TagProps> = ({ id, label, color, owner, onDelete }) => {
  const { theme } = useTheme();
  const bg =
    theme === "dark" ? { background: color.dark } : { background: color.light };

  const MotionIcon = motion(FontAwesomeIcon);

  return (
    <motion.div
      className="flex w-fit select-none flex-row items-center justify-center gap-2 rounded-full bg-white px-3 py-2 text-black shadow-md dark:bg-gray-900 dark:text-white"
      whileHover="hover"
    >
      <span style={bg} className="h-5 w-5 rounded-full" />
      <span>{label}</span>
      <MotionIcon
        icon="trash-can"
        className="cursor-pointer p-1"
        onClick={(e) => {
          e.stopPropagation();
          onDelete({ id, color, label, owner });
        }}
        initial={{ scale: 0, width: 0 }}
        variants={{ hover: { scale: 1, width: "auto" } }}
      />
    </motion.div>
  );
};
