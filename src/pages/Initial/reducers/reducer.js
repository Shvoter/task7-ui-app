import * as PAGES from 'constants/pages';

const initialState = {
  availableItems: [
    {
      href: undefined,
      pathname: PAGES.TASKS,
      displayName: "List of Tasks",
      propsAsString: ''
    }
  ]
}

export default (state = initialState, {type, payload}) => {
  switch (type) {

    default: return state;
  }
}
