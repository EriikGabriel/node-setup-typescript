import { User } from "@models/User";

test("it should be okay", () => {
  const user = new User();
  user.name = "Erik";
  expect(user.name).toEqual("Erik");
});
