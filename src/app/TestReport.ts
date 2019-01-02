import { Test } from "./Test";
import { User } from "./user";

export class TestReport {
  id:number;
  description:String;
  reporter:User;
  reportedTest:Test;
  solved:boolean;

}
