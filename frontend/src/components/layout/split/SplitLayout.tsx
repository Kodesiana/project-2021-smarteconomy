import clsx from "clsx";
import React from "react";
import styles from "./SplitLayout.module.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
}

const SplitLayout = ({ children, className }: Props) => {
    return (
        <div className={clsx(styles.root, className)}>
            {children}
        </div>
    );
};

SplitLayout.DisplayName = "SplitLayout";
SplitLayout.Panel = function Panel({ children, className, ...props }: Props) {
    return (
        <div className={clsx(styles.panel, className)} {...props}>
            {children}
        </div>
    );
};
SplitLayout.Divider = function Divider({ className, ...props}: Props) {
    return (
        <div className={clsx(styles.divider, className)} {...props}/>
    );
};

export default SplitLayout;