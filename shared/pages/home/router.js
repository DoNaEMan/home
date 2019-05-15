import loadable from '@loadable/component';

export default [{
  path: '/home',
  exact: true,
  withoutPathName: true,
  component: loadable(() => import('./Home'))
}];