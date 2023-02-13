import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Link from 'components/Link';
import Typography from 'components/Typography';
import useAccessValidate from 'hooks/useAccessValidate';
import { AUTHORITIES } from '../constants/neededAuthorities'
const getClasses = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
}));


const Initial = ({
  authorities,
}) => {
  const classes = getClasses();
  const {
    availableItems,
  } = useSelector(({ reducer })=> reducer);
  const canSeeList = useAccessValidate({
    ownedAuthorities: authorities,
    neededAuthorities: AUTHORITIES,
  });

  return (
    <div className={classes.container}>
      {canSeeList && availableItems.map((item) => (
          <Link
              href={item.href}
              to={item.href
                  ? undefined
                  : (location => ({
                    ...location,
                    pathname: `/${item.pathname}`,
                    search: `${location.search}${item.propsAsString}`
                  }))}
          >
            {item.displayName}
          </Link>
      ))}
      {!canSeeList && (
        <Typography>
          Не могу ничего показать :(
        </Typography>
      )}
    </div>
  )
};

export default Initial;
