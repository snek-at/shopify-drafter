export interface Draft {
  id: number,
  name: string,
  category: string,
  description: string,
  thumbnail: {uri: string},
  gallery: [{uri: string}]
}

export interface Props {
  route: any,
  navigation: any,
}