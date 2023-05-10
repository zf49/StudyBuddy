import { recommend } from "../dao/user-dao";
import { getUserProfile } from "./../dao/user-dao";
import { getUserFriends } from './../dao/friend-dao'
import { userRecommand } from "./../controller/userController";
import { User } from "../schema/user-schema";
import { ICourse } from "../schema/course_schema";

jest.mock('./../dao/user-dao');
jest.mock('./../dao/friend-dao');
jest.mock('../schema/user-schema');

test('userRecommand', () => {

    let mockReq: any, mockRes: any

    beforeEach(() => {
        mockReq = {
            body: {
                "authID": "auth0|6432db77953ebdac04e8da15"
            },
        };
        mockRes = {
            send: jest.fn(),
        };

    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    it("should return non-friend recommended users", async () => {

        const data = userRecommand(mockReq, mockRes)

        expect(data).toBe([
            {
                "_id": "645a33c4aaba0c6d1cb4e75f",
                "name": "Elizabeth Taylor",
                "uniID": "etaylor789",
                "gender": "Female",
                "email": "elizabethtaylor789@email.com",
                "faculty": "Health Sciences",
                "major": "Nursing",
                "authID": "auth0|zxcvbnm456",
                "userAvatar": "https://i.pravatar.cc/150?img=6",
                "courses": [
                    {
                        "course_code": "COM100",
                        "course_name": "Public Speaking",
                        "CourseNName": "COM100: Public Speaking"
                    },
                    {
                        "course_code": "HIS220",
                        "course_name": "American History",
                        "CourseNName": "HIS220: American History"
                    },
                    {
                        "course_code": "MAT110",
                        "course_name": "Calculus I",
                        "CourseNName": "MAT110: Calculus I"
                    },
                    {
                        "course_code": "MKT301",
                        "course_name": "Marketing Management",
                        "CourseNName": "MKT301: Marketing Management"
                    },
                    {
                        "course_code": "GEO101",
                        "course_name": "Physical Geography",
                        "CourseNName": "GEO101: Physical Geography"
                    }
                ],
                "__v": 0,
                "matchedCourses": [
                    {
                        "course_code": "COM100",
                        "course_name": "Public Speaking",
                        "CourseNName": "COM100: Public Speaking"
                    }
                ],
                "matchedCount": 1
            },
            {
                "_id": "645a33c4aaba0c6d1cb4e75d",
                "name": "Samantha Wilson",
                "uniID": "swilson123",
                "gender": "Female",
                "email": "samanthawilson123@email.com",
                "faculty": "Business",
                "major": "Finance",
                "authID": "auth0|asdfjkl789",
                "userAvatar": "https://i.pravatar.cc/150?img=4",
                "courses": [
                    {
                        "course_code": "COM100",
                        "course_name": "Public Speaking",
                        "CourseNName": "COM100: Public Speaking"
                    },
                    {
                        "course_code": "HIS220",
                        "course_name": "American History",
                        "CourseNName": "HIS220: American History"
                    },
                    {
                        "course_code": "MAT110",
                        "course_name": "Calculus I",
                        "CourseNName": "MAT110: Calculus I"
                    }
                ],
                "__v": 0,
                "matchedCourses": [
                    {
                        "course_code": "COM100",
                        "course_name": "Public Speaking",
                        "CourseNName": "COM100: Public Speaking"
                    }
                ],
                "matchedCount": 1
            },
            {
                "_id": "645a33c4aaba0c6d1cb4e75e",
                "name": "David Brown",
                "uniID": "dbrown456",
                "gender": "Male",
                "email": "davidbrown456@email.com",
                "faculty": "Social Sciences",
                "major": "Political Science",
                "authID": "auth0|qweruiop123",
                "userAvatar": "https://i.pravatar.cc/150?img=5",
                "courses": [
                    {
                        "course_code": "COM100",
                        "course_name": "Public Speaking",
                        "CourseNName": "COM100: Public Speaking"
                    },
                    {
                        "course_code": "MAT110",
                        "course_name": "Calculus I",
                        "CourseNName": "MAT110: Calculus I"
                    }
                ],
                "__v": 0,
                "matchedCourses": [
                    {
                        "course_code": "COM100",
                        "course_name": "Public Speaking",
                        "CourseNName": "COM100: Public Speaking"
                    }
                ],
                "matchedCount": 1
            },
            {
                "_id": "645a33c4aaba0c6d1cb4e764",
                "name": "Bob Johnson",
                "uniID": "bjohnson",
                "gender": "Male",
                "email": "bjohnson@university.edu",
                "faculty": "Engineering",
                "major": "Electrical Engineering",
                "authID": "auth0|2ab3cd45ef67gh89ij01kl23",
                "userAvatar": "https://i.pravatar.cc/150?img=3",
                "courses": [
                    {
                        "course_code": "PSY101",
                        "course_name": "Introduction to Psychology",
                        "CourseNName": "PSY101: Introduction to Psychology"
                    },
                    {
                        "course_code": "POL201",
                        "course_name": "International Relations",
                        "CourseNName": "POL201: International Relations"
                    },
                    {
                        "course_code": "ART210",
                        "course_name": "Oil Painting",
                        "CourseNName": "ART210: Oil Painting"
                    }
                ],
                "__v": 0,
                "matchedCourses": [
                ],
                "matchedCount": 0
            },
            {
                "_id": "645a33c4aaba0c6d1cb4e76b",
                "name": "Bob Johnson",
                "uniID": "BJ789",
                "gender": "Male",
                "email": "bobjohnson@example.com",
                "faculty": "Engineering",
                "major": "Electrical Engineering",
                "authID": "auth0|sldfkj332",
                "userAvatar": "https://i.pravatar.cc/150?img=3",
                "courses": [
                ],
                "__v": 0,
                "matchedCourses": [
                ],
                "matchedCount": 0
            }
        ]
        );


    })



});