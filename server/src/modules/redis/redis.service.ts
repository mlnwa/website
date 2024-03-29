import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  private readonly client: Redis;
  constructor(private readonly configService: ConfigService) {
    const redisConfig = this.configService.get('redis');
    this.client = new Redis({
      host: redisConfig.host,
      port: redisConfig.port,
      password: redisConfig.password,
      db: 0,
    });
  }

  async get(key: string): Promise<string> {
    return await this.client.get(key);
  }
  async set(key: string, value: string, ttl?: number): Promise<void> {
    await this.client.set(key, value);
    if (ttl) {
      await this.client.expire(key, ttl);
    }
  }
  async has(key: string): Promise<boolean> {
    return (await this.client.exists(key)) > 0;
  }
  async del(key: string): Promise<void> {
    await this.client.del(key);
  }
  async keys(pattern: string): Promise<string[]> {
    return await this.client.keys(pattern);
  }
  async flushall(): Promise<void> {
    await this.client.flushall();
  }
}
