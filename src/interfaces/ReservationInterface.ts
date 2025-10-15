export interface CreateReservationInterface {
  user_id: number;
  space_id: number;
  reservation_date: Date;
  start_time: Date;
  end_time: Date;
  status?: string;
  approved_by?: number | null;
  rejection_reason?: string | null;
}

export interface ListReservationInterface {
  id: number;
}

export interface UpdateReservationInterface {
  id: number;
  user_id?: number;
  space_id?: number;
  reservation_date?: Date;
  start_time?: Date;
  end_time?: Date;
  status?: string;
  approved_by?: number | null;
  rejection_reason?: string | null;
}

export interface DeleteReservationInterface {
  id: number;
}
