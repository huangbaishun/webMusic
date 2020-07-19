const CommonSiger = () => import('../components/CommonSiger')
const CommonSearch = () => import('../components/CommonSearch')
const CommonRank = () => import('../components/CommonRank')
const CommonRecommed = () => import('../components/CommonRecommed')
const NotFound = () => import('../components/NotFound/index')

const routes = [
  {
    path: '/',
    redirect: '/recommed'
  },
  {
    path: '/siger',
    component: CommonSiger
  },
  {
    path: '/search',
    component: CommonSearch
  },
  {
    path: '/rank',
    component: CommonRank
  },
  {
    path: '/recommed',
    component: CommonRecommed
  },
  {
    path: '*',
    component: NotFound
  }
]
export default routes