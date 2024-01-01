export class BlogPageVo {
  id: number;
  title: string;
  createTime: Date;
  updateTime: Date;
  userId: number;
  userName: string;
  categoryId: number;
  categoryName: string;
  columnId: number;
  columnName: string;
  tags: string[];
}

export class BlogDetailVo extends BlogPageVo {
  content: string;
}
