import './FlexBetween.scss'

type Props = {
  children?: React.ReactNode
}

export default function FlexBetween({ children }: Props) {
  return <div className="flex-between">{children}</div>
}
