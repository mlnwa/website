import { BlogFromStatus, BlogStatus } from '../blog.enum';

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
  fromStatus: BlogFromStatus;
  tagIds: number[];
  imgUrl: string;
  abstract: string;
}

export class BlogDetailVo extends BlogPageVo {
  content: string;
  status: BlogStatus;
  enableComment: boolean;
  enableCopyright: boolean;
  enablePraise: boolean;
  enableRecommend: boolean;
}
