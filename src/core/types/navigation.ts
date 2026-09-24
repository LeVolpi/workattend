export type NavigationItem = {
  label: string
  href: string
}

export type AccountAction = NavigationItem & {
  variant: 'primary' | 'secondary'
}
