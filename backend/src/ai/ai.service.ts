import { GoogleGenAI } from '@google/genai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiService {
  private readonly ai: GoogleGenAI;

  constructor(private config: ConfigService) {
    this.ai = new GoogleGenAI({
      apiKey: this.config.get<string>('GEMINI_API_KEY'),
    });
  }

  async test() {
    const res = await this.ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: 'what is the lyrics for bloom necry talkie',
    });
    return res.text;
  }

  async getCapsuleProposalInfo(text: string) {
    const res = await this.ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Based on the text ${text},
        Task: extract the text for:
        -Acceleration Proposal Title ( can be found above the Duration: 3 months, etc.)
        - Startup Description
        - Problem Statement
        - Target Market
        - Solution Description
        - Objectives
        - Scope of The Proposal
        - Methodology and Expected Outputs

        Requirement: The response should be in a JSON format.
        It should consist of title, startup_description, problem_statement, target_market, solution_description, objectives, scope, and methodology
        JSON format: {"title": "", "startup_description": "", "problem_statement": (int), "target_market": "", "solution_description": "", "objectives": "", "scope": "", "methodology": ""}
        `,
    });
    return res.text;
  }
}
