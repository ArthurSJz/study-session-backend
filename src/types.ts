export interface CreateSubjectBody {
  name: string;
  description?: string;
  color?: string;
}

export interface UpdateSubjectBody {
  name?: string;
  description?: string;
  color?: string;
}

export interface CreateSessionBody {
  date: string;
  duration: number;
  notes?: string;
  subjectId: number;
}

export interface UpdateSessionBody {
  date?: string;
  duration?: number;
  notes?: string;
  subjectId?: number;
}

export interface IdParam {
  id: string;
}