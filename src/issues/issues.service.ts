import { Injectable, NotFoundException } from '@nestjs/common';
import { Issue, IssueStatus } from './issues.model';
import { v1 as uuid } from 'uuid';
import { CreateIssueDto } from './dto/create-issues.dto';

@Injectable()
export class IssuesService {
  private issues: Issue[] = [];

  getAllissues(): Issue[] {
    return this.issues;
  }

  getAllissueByStatus(status: string): Issue[] {
    if (status === 'open') {
      return this.issues.filter((issue) => issue.status === IssueStatus.OPEN);
    } else if (status === 'close') {
      return this.issues.filter((issue) => issue.status === IssueStatus.CLOSE);
    }
    return [];
  }

  createIssue(createIssueDto: CreateIssueDto) {
    const { title, content } = createIssueDto;

    const issue: Issue = {
      id: uuid(),
      title,
      content,
      status: IssueStatus.OPEN,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.issues.push(issue);
    return issue;
  }

  getIssueById(id: string): Issue {
    const issue = this.issues.find((issue) => issue.id === id);
    if (!issue) throw new NotFoundException(`Can't find Issue with id ${id}`);
    return issue;
  }

  getIssueByTitle(title: string): Issue {
    return this.issues.find((issue) => issue.title.includes(title));
  }

  deleteIssueById(id: string): Issue[] {
    const issue = this.getIssueById(id);
    if (!issue) throw new NotFoundException(`Can't find Issue with id ${id}`);
    return this.issues.filter((issue) => issue.id !== id);
  }

  updateStatusById(id: string, status: IssueStatus): Issue {
    const issue = this.getIssueById(id);
    issue.status = status;
    return issue;
  }

  updateContentById(id: string, content: string): Issue {
    const issue = this.getIssueById(id);
    issue.content = content;
    return issue;
  }
}