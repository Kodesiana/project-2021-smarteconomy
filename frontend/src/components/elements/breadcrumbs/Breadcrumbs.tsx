import { ReactNode } from 'react';
import { Anchor, Breadcrumbs as BaseBread } from "@mantine/core";
import { House } from 'phosphor-react';
import { ChevronRight } from 'react-feather';
import styles from './Breadcrumbs.module.scss';

type Props = {
    items: Array<{ title: string, href?: string; icon?: ReactNode; }>;
};

const Breadcrumbs = (props: Props) => {
    const items = [
        { title: 'Home', href: '#', icon: <House size={14} /> },
        ...props.items
    ].map((item, index) => (
        <Anchor href={item.href?? "#"} key={index} style={{fontSize: 12}}>
            {item.icon ? item.icon : item.title}
        </Anchor>
    ));
    return (
        <BaseBread 
            separator={<ChevronRight size={12} />}
            classNames={{ breadcrumb: styles.breadcrumb }}
        >
            {items}
        </BaseBread>
    );
};

export default Breadcrumbs;