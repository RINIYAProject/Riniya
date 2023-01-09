/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ServerBuilder.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/09 08:17:15 by alle.roy          #+#    #+#             */
/*   Updated: 2023/01/09 08:17:16 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export default class ServerBuilder {
    private readonly version: string;
    private readonly name: string;
    private readonly revision: string;

    public constructor(version: string, name: string, revision?: string) {
        this.version = version;
        this.name = name;
        this.revision = revision || 'R01';
    }

    public getVersion(): string {
        return this.version;
    }

    public getName(): string {
        return this.name;
    }

    public getRevision(): string {
        return this.revision;
    }
}