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

  async generateTasksFromPrompt(prompt: string): Promise<{ target_level: number; description: string }[]> {
    const res = await this.ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    const text = res.text;

    if (!text) {
      throw new Error('AI response did not contain any text');
    }

    try {
      const jsonStart = text.indexOf('[');
      const jsonEnd = text.lastIndexOf(']');
      const jsonString = text.substring(jsonStart, jsonEnd + 1);
      return JSON.parse(jsonString);
    } catch (err) {
      console.error('Failed to parse AI response:', text);
      throw new Error('AI returned an invalid response');
    }
  }

  async generateInitiativesFromPrompt(
    prompt: string
  ): Promise<{ description: string; measures: string; targets: string; remarks: string }[]> {
    const res = await this.ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    const text = res.text;

    if (!text) {
      throw new Error('AI response did not contain any text');
    }

    try {
      const jsonStart = text.indexOf('[');
      const jsonEnd = text.lastIndexOf(']');
      const jsonString = text.substring(jsonStart, jsonEnd + 1);

      return JSON.parse(jsonString).map((entry: any) => ({
        description: entry.description,
        measures: entry.measures,
        targets: entry.targets,
        remarks: entry.remarks,
      }));
    } catch (err) {
      console.error('Failed to parse AI response:', text);
      throw new Error('AI returned an invalid initiative response');
    }
  }

  async refineRnsDescription(prompt: string): Promise<{ refinedDescription: string; aiCommentary: string }> {
    const res = await this.ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });
    if (!res.text) {
      throw new Error('AI response did not contain any text');
    }

    const [refinedDescriptionRaw, aiCommentaryRaw] = res.text.split(/\n?={5,}\n?/);
    const refinedDescription = refinedDescriptionRaw ? refinedDescriptionRaw.trim() : '';
    const aiCommentary = aiCommentaryRaw ? aiCommentaryRaw.trim() : '';
    return {
      refinedDescription,
      aiCommentary,
    };
  }
}
