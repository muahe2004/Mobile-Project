export interface Lectures {
  maBaiHoc: string;
  tenBaiHoc: string;
  moTaBaiHoc: string;
  video: string;
  maChuongHoc: string;
  tenChuongHoc: string;
  maKhoaHoc: string;
}

export interface LecturesLearning {
  maBaiHoc: string;
  tenBaiHoc: string;
  moTaBaiHoc: string;
  video: string;
  maChuongHoc: string;
  tenChuongHoc: string;
  maKhoaHoc: string;
  daHoanThanh: boolean;
}

export interface Answer {
  maDapAn: string;
  noiDungDapAn: string;
  laDapAnDung: { type: string; data: number[] };
  maCauHoi: string;
}

export interface ListQuestions {
  maBaiHoc: string;
  maCauHoi?: string;
  id?: string;
  noiDung: string;
  dapAn: Answer[];
}

export interface Courses {
  id?: string;
  maKhoaHoc: string;
  tenKhoaHoc: string;
  moTaKhoaHoc: string;
  hinhAnh: string;
  doKho: string;
  giaBan: number;
  maGiangVien: string;
}

export interface YouTubeVideoDurationResponse {
  videoId: string;
  duration: string;
}