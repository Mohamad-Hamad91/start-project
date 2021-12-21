import { Inject } from '@nestjs/common';
import { Console, Command, createSpinner } from 'nestjs-console';
import { ResumeService } from 'src/api/resume/resume.service';
import { City, Country } from 'src/utils/constants/countries';
import { Nationality } from 'src/utils/constants/nationalits';
import { Shift } from 'src/utils/constants/shift';
import { WorkType } from 'src/utils/constants/workType';

@Console()
export class SeedService {
    constructor(@Inject(ResumeService) private usersService: ResumeService,) { }

    @Command({
        command: 'seed',
        description: 'Seed DB',
    })
    async seed(): Promise<void> {
        const spin = createSpinner();
        spin.start('Seeding the DB');
        await this.seedResume();
        spin.succeed('Seeding done');
    }

    async seedResume() {
        await this.usersService.create({
            email: 'any@mail.com',
            fName: 'First',
            lName: 'last',
            photo: '',
            phone: '+963987654321',
            country: Country.Syria,
            city: City.Damascus,
            address: '',
            birthDate: new Date(),
            nationality: Nationality.Syrian,
            available: true,
            availableAt: new Date(),
            workType: WorkType.FREELANCE,
            shift: Shift.EVENING,
            summary: 'any thing',
            hobbies: 'reading',
            armyServiceStatus: null,
            employmentHistory: [],
            courses: [],
            education: [],
            links: [],
            projects: [],
            references: [],
            languages: [],
            skills: []
        });
    }
}