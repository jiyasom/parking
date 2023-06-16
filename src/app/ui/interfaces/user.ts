export interface IUser {
  name: string;
  role: string;
  address: string;
  lastName?: string;
  img?: string | ArrayBuffer;
  gender?: string;
  profileLink?: string;
  social?: IUserLink[];
}



export interface slote_settings {
  slote_id: 0;
  car_type: string;
  disable_person: boolean;
  shade?: boolean;
  price?: string ;
  visible?: boolean;
  
}

export interface IUserLink {
  icon: string;
  link: string;
}


export interface customer {
  cust_id: 0;
  name: string;
  email: boolean;
  mob?: boolean;
}



