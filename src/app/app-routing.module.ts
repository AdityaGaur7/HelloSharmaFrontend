{
  path: 'chat/:id',
  component: ChatcompComponent,
  canActivate: [AuthGuard]
} 