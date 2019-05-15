import loadable from '@loadable/component';

import Loading from '../../components/common/Loading/index';

export default [{
  path: '/index',
  exact: true,
  component: loadable(() => import('./B'), { ssr: false, })
}]