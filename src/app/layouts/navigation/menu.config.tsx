import type { ReactNode } from 'react'
import AnimatedIcon from '@wui/AnimatedIcon'
import { routePolicies } from '@platform/auth/model/policy'
import { createNavigationTree } from '@platform/navigation/menu'
import {
  HomeOutlined,
  DeploymentUnitOutlined,
  HeatMapOutlined,
  ApartmentOutlined,
  QuestionCircleOutlined,
  GlobalOutlined,
  QrcodeOutlined,
  RocketOutlined,
  BankOutlined,
  FundProjectionScreenOutlined,
  BarChartOutlined,
  HighlightOutlined,
  ExperimentOutlined,
  SoundOutlined,
  LockOutlined,
  VideoCameraOutlined,
  PieChartOutlined,
  RobotOutlined,
  SendOutlined,
  EnvironmentOutlined,
  PrinterOutlined,
  UserOutlined,
  ContactsOutlined,
  Html5Outlined,
  CloudServerOutlined,
  AppstoreOutlined,
  CodeOutlined,
  ProjectOutlined,
  FileTextOutlined,
  ThunderboltOutlined,
  ToolOutlined,
  CloudUploadOutlined,
  DatabaseOutlined,
  SafetyCertificateOutlined,
  NodeIndexOutlined,
  PlayCircleOutlined,
  BookOutlined,
  RadarChartOutlined,
} from '@ant-design/icons'

const icons = {
  HomeOutlined,
  DeploymentUnitOutlined,
  HeatMapOutlined,
  ApartmentOutlined,
  QuestionCircleOutlined,
  GlobalOutlined,
  QrcodeOutlined,
  RocketOutlined,
  BankOutlined,
  FundProjectionScreenOutlined,
  BarChartOutlined,
  HighlightOutlined,
  ExperimentOutlined,
  SoundOutlined,
  LockOutlined,
  VideoCameraOutlined,
  PieChartOutlined,
  RobotOutlined,
  SendOutlined,
  EnvironmentOutlined,
  PrinterOutlined,
  UserOutlined,
  ContactsOutlined,
  Html5Outlined,
  CloudServerOutlined,
  AppstoreOutlined,
  CodeOutlined,
  ProjectOutlined,
  FileTextOutlined,
  ThunderboltOutlined,
  ToolOutlined,
  CloudUploadOutlined,
  DatabaseOutlined,
  SafetyCertificateOutlined,
  NodeIndexOutlined,
  PlayCircleOutlined,
  BookOutlined,
  RadarChartOutlined,
}

export const mainLayoutMenu = createNavigationTree(routePolicies)

export function createMenuIcon(name?: string): ReactNode {
  const Icon = name ? icons[name as keyof typeof icons] : undefined
  return Icon ? (
    <AnimatedIcon variant="spin" mode="hover">
      <Icon aria-hidden />
    </AnimatedIcon>
  ) : undefined
}
