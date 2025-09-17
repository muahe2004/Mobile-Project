export interface Lectures {
  maBaiHoc: string;
  tenBaiHoc: string;
  moTaBaiHoc: string;
  video: string;
  maChuongHoc: string;
  tenChuongHoc: string;
  maKhoaHoc: string;
}

export interface Answer {
  maDapAn: string;
  noiDungDapAn: string;
  laDapAnDung: { type: string; data: number[] };
  maCauHoi: string;
}

export interface ListQuestions {
  maBaiHoc: string;
  maCauHoi: string;
  noiDung: string;
  dapAn: Answer[];
}

export interface Courses {
  maKhoaHoc: string;
  tenKhoaHoc: string;
  moTaKhoaHoc: string;
  hinhAnh: string;
  doKho: string;
  giaBan: number;
  maGiangVien: string;
}