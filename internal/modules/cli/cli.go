package cli

import (
	"github.com/spf13/cobra"
)

func RunCli() {
	var cmdAddDoc = &cobra.Command{
		Use:   "add [filePath]",
		Short: "Get either a hash of a file or an entire file from the DHT network.",
		Args:  cobra.MinimumNArgs(1),
		Run: func(cmd *cobra.Command, args []string) {

		},
	}
	var rootCmd = &cobra.Command{Use: "astrid"}
	rootCmd.AddCommand(cmdAddDoc)
	rootCmd.Execute()
}
