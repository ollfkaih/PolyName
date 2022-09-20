import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Employee } from './hooks/useFetchEmployees';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: undefined;
  Question: undefined;
  TabOne: undefined;
  TabTwo: undefined;
  Modal: {
    employee: Employee;
  };
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type AnswerStatus = 'CORRECT' | 'INCORRECT' | 'UNANSWERED';

export interface QuestionBase {
  type: string;
}

export interface NameSelectQuestion extends QuestionBase {
  type: 'name-select';
  correctAnswer: Employee;
  incorrectAnswers: Employee[];
}

export interface PictureSelectQuestion extends QuestionBase {
  type: 'picture-select';
  correctAnswer: Employee;
  incorrectAnswers: Employee[];
}

export type Question = NameSelectQuestion | PictureSelectQuestion;

export interface Quiz {
  questions: Question[];
}
