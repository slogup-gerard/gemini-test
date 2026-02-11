import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
import { CoreHardEntity } from 'src/database/entity/core-hard.entity';
import { ToBoolean } from 'src/shared/dtos/transformers';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ResumeSupportField } from './resume-support-field.entity';
import { RegionResume } from './region-resume.entity';
import { ResumeCareer } from './resume-career.entity';
import { ResumeCertification } from './resume-certification.entity';
import { JobApplication } from 'src/domain/job-posting/entities/job-application.entity';
import { InterviewOffer } from 'src/domain/job-posting/entities/interview-offer.entity';
import {User} from "../../user/entities/user.entity";


@Entity('resume')
export class Resume extends CoreHardEntity {
  @ApiProperty({
    required: true,
    description: '구직자 user PK (users.id)',
  })
  @Column({
    name: 'member_id',
    type: 'bigint',
    nullable: false,
    comment: '구직자 user PK (users.id)',
  })
  memberId: number;

  @ApiProperty({
    required: false,
    description: '프로필 사진 (attachment.id)',
  })
  @IsOptional()
  @Column({
    name: 'attachment_id',
    type: 'bigint',
    unsigned: true,
    nullable: true,
    comment: '프로필 사진 (attachment.id, 선택, max 10MB)',
  })
  attachmentId: number;

  @ApiProperty({
    required: true,
    description: '이름 (마스킹 처리: 홍*동)',
    example: '홍*동',
  })
  @IsString()
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: '이름 (마스킹 처리)',
  })
  name: string;

  @ApiProperty({
    required: false,
    description: '성별 (M, F)',
    example: 'M',
  })
  @IsOptional()
  @IsString()
  @Column({
    type: 'varchar',
    length: 10,
    nullable: true,
    comment: '성별 (M, F)',
  })
  sex: string;

  @ApiProperty({
    required: false,
    description: '출생연도',
    example: 1990,
  })
  @IsOptional()
  @IsInt()
  @Column({
    name: 'birth_year',
    type: 'int',
    nullable: true,
    comment: '출생연도',
  })
  birthYear: number;

  @ApiProperty({
    required: true,
    description: '연락처',
    example: '010-1234-5678',
  })
  @IsString()
  @Column({
    type: 'varchar',
    length: 30,
    nullable: false,
    comment: '연락처',
  })
  phone: string;

  @ApiProperty({
    required: false,
    description: '이메일 (선택)',
    example: 'user@example.com',
  })
  @IsOptional()
  @IsString()
  @Column({
    type: 'varchar',
    length: 254,
    nullable: true,
    comment: '이메일 (선택)',
  })
  email: string;

  @ApiProperty({
    required: false,
    description: '지원 분야 (resume_support_field.id)',
  })
  @IsOptional()
  @Column({
    name: 'support_id',
    type: 'bigint',
    unsigned: true,
    nullable: true,
    comment: '지원 분야 (resume_support_field.id)',
  })
  supportId: number;

  @ApiProperty({
    required: false,
    description: '희망 급여',
    example: '3000만원',
  })
  @IsOptional()
  @IsString()
  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    comment: '희망 급여',
  })
  salary: string;

  @ApiProperty({
    required: false,
    description: '간단 소개',
  })
  @IsOptional()
  @IsString()
  @Column({ type: 'text', nullable: true, comment: '간단 소개' })
  summary: string;

  @ApiProperty({
    required: true,
    default: false,
    description: '경력 유무 (1:경력, 0:신입)',
  })
  @ToBoolean()
  @IsBoolean()
  @Column({
    name: 'has_experience',
    type: 'tinyint',
    default: 0,
    nullable: false,
    comment: '경력 유무 (1:경력, 0:신입)',
  })
  hasExperience: boolean;

  @ApiProperty({
    required: false,
    description: '직접 입력 분야',
  })
  @IsOptional()
  @IsString()
  @Column({
    name: 'field_custom',
    type: 'varchar',
    length: 100,
    nullable: true,
    comment: '직접 입력 분야',
  })
  fieldCustom: string;

  @ApiProperty({
    required: false,
    description: '자기소개 (선택, max 1000자)',
  })
  @IsOptional()
  @IsString()
  @Column({
    type: 'text',
    nullable: true,
    comment: '자기소개 (선택, max 1000자)',
  })
  introduction: string;

  @ApiProperty({
    required: false,
    description: '경력 기술 (선택, max 1000자)',
  })
  @IsOptional()
  @IsString()
  @Column({
    name: 'career_description',
    type: 'text',
    nullable: true,
    comment: '경력 기술 (선택, max 1000자)',
  })
  careerDescription: string;

  @ApiProperty({
    required: true,
    default: false,
    description: '게시 여부 (1:게시, 0:비공개)',
  })
  @ToBoolean()
  @IsBoolean()
  @Column({
    name: 'is_published',
    type: 'tinyint',
    default: 0,
    nullable: false,
    comment: '게시 여부 (1:게시, 0:비공개)',
  })
  isPublished: boolean;

  @ApiProperty({
    required: true,
    default: false,
    description: '정보 공개 동의 (1:동의, 0:미동의)',
  })
  @ToBoolean()
  @IsBoolean()
  @Column({
    name: 'privacy_agreed',
    type: 'tinyint',
    default: 0,
    nullable: false,
    comment: '정보 공개 동의 (1:동의, 0:미동의)',
  })
  privacyAgreed: boolean;

  @ApiProperty({
    required: true,
    default: false,
    description: '허위사실 없음 동의 (1:동의, 0:미동의)',
  })
  @ToBoolean()
  @IsBoolean()
  @Column({
    name: 'no_false_info',
    type: 'tinyint',
    default: 0,
    nullable: false,
    comment: '허위사실 없음 동의 (1:동의, 0:미동의)',
  })
  noFalseInfo: boolean;

  @ApiProperty({
    required: false,
    description: '정보 공개 동의일',
  })
  @Column({
    name: 'privacy_agreed_date',
    type: 'datetime',
    nullable: true,
    comment: '정보 공개 동의일',
  })
  privacyAgreedDate: Date;

  @ApiProperty({
    required: false,
    description: '게시 시작일',
  })
  @Column({
    name: 'published_at',
    type: 'datetime',
    nullable: true,
    comment: '게시 시작일',
  })
  publishedAt: Date;

  @ApiProperty({
    required: false,
    description: '만료일 (30일 후 미노출)',
  })
  @Column({
    name: 'expires_at',
    type: 'datetime',
    nullable: true,
    comment: '만료일 (30일 후 미노출)',
  })
  expiresAt: Date;

  // ── 관계 ──

  @ManyToOne(() => User)
  @JoinColumn({name: 'member_id'})
  user: User;

  @ManyToOne(() => ResumeSupportField, { nullable: true })
  @JoinColumn({ name: 'support_id' })
  supportField: ResumeSupportField;

  @OneToMany(() => RegionResume, (rr) => rr.resume)
  regionResumes: RegionResume[];

  @OneToMany(() => ResumeCareer, (rc) => rc.resume)
  careers: ResumeCareer[];

  @OneToMany(() => ResumeCertification, (rc) => rc.resume)
  certifications: ResumeCertification[];

  @OneToMany(() => JobApplication, (ja) => ja.resume)
  applications: JobApplication[];

  @OneToMany(() => InterviewOffer, (io) => io.resume)
  interviewOffers: InterviewOffer[];
}
