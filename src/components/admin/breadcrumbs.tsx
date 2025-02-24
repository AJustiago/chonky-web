// MyBreadcrumbs.tsx
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';

interface MyBreadcrumbsProps {
  user: string;
  menu: string[];
  link: string[];
}

const MyBreadcrumbs: React.FC<MyBreadcrumbsProps> = ({ user, menu, link }) => {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem key="main">
            <BreadcrumbLink href={user === 'Admin' ? '/admin' : '/'}>
              {user}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {menu.map((item, index) => (
            <React.Fragment key={`breadcrumb-${index}`}>
              <BreadcrumbItem>
                <BreadcrumbLink href={link[index]}>
                  {index === menu.length - 1 ? <strong>{item}</strong> : item}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index < menu.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    );
  };
  

export default MyBreadcrumbs;
