export declare class Achievements {
	/// Award a player!
	Award(
		userID: number,
		achievementID: number,
		callback: (success: boolean, error: string | undefined) => void
	): void;
	HasAchievement(
		userID: number,
		achievementID: number,
		callback: (
			owned: boolean,
			success: boolean,
			error: string | undefined
		) => void
	): void;
}
