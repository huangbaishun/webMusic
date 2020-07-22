const CommonSiger = () => import('../components/CommonSiger/index')
const CommonSearch = () => import('../components/CommonSearch')
const CommonRank = () => import('../components/CommonRank')
const CommonRecommed = () => import('../components/CommonRecommed/index')
const NotFound = () => import('../components/NotFound/index')
const SingerDetailed = () => import('../components/CommonSiger/SingerDetailed')

const routes = [
  {
    path: '/',
    redirect: '/recommed'
  },
  {
    path: '/search',
    component: CommonSearch
  },
  {
    path: '/singer',
    component: CommonSiger,
    children: [
      {
        path: ':uid',
        component: SingerDetailed
      }
    ]
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